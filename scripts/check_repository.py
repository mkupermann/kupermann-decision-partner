#!/usr/bin/env python3
"""Check packaging and the illustrative calculation, using Python's standard library."""
from __future__ import annotations

import re
import struct
import sys
import xml.etree.ElementTree as ET
from decimal import Decimal
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "skills" / "kupermann-decision-partner"
ERRORS: list[str] = []


def require(condition: bool, message: str) -> None:
    if not condition:
        ERRORS.append(message)


def check_documents() -> None:
    require((SKILL / "LICENSE").exists(), "Installable skill is missing its licence notice")
    for file in ROOT.rglob("*.md"):
        if ".git" in file.parts:
            continue
        content = file.read_text(encoding="utf-8")
        require("[TODO" not in content, f"Unfinished template in {file.relative_to(ROOT)}")
        # Ignore fenced examples when checking actual Markdown links.
        prose = re.sub(r"```.*?```", "", content, flags=re.S)
        for match in re.finditer(r"!?\[[^\]]*\]\(([^)]+)\)", prose):
            target = match.group(1).split(' "', 1)[0].strip("<>")
            if urlsplit(target).scheme or target.startswith("#"):
                continue
            dest = (file.parent / unquote(target.split("#", 1)[0])).resolve()
            require(dest.exists(), f"Broken local link in {file.relative_to(ROOT)}: {target}")
            if SKILL in file.parents:
                require(dest.is_relative_to(SKILL), f"Skill depends on an unpackaged file: {target}")

    entry = (SKILL / "SKILL.md").read_text(encoding="utf-8")
    require(entry.startswith("---\n"), "Missing skill frontmatter")
    front = entry.split("---", 2)[1]
    name = re.search(r"^name:\s*(.+)$", front, re.M)
    description = re.search(r"^description:\s*(.+)$", front, re.M)
    require(bool(name and name.group(1) == SKILL.name), "Skill name does not match directory")
    require(bool(description and 1 <= len(description.group(1)) <= 1024), "Invalid skill description")
    require(len(entry.splitlines()) < 500, "Skill entrypoint is too large")
    ui = (SKILL / "agents" / "openai.yaml").read_text(encoding="utf-8")
    require("$kupermann-decision-partner" in ui, "UI prompt is missing the skill invocation")


def check_figures() -> None:
    namespace = {"s": "http://www.w3.org/2000/svg"}
    figures = list((ROOT / "docs" / "figures").glob("*.svg"))
    require(len(figures) == 7, "Expected seven source figures")
    for file in figures:
        try:
            root = ET.parse(file).getroot()
        except ET.ParseError as error:
            ERRORS.append(f"Invalid SVG {file.name}: {error}")
            continue
        require(root.find("s:title", namespace) is not None, f"Missing SVG title: {file.name}")
        require(root.find("s:desc", namespace) is not None, f"Missing SVG description: {file.name}")
        require(bool(root.findall(".//s:text", namespace)), f"No editable SVG text: {file.name}")
        require(root.find(".//s:script", namespace) is None, f"Unexpected SVG script: {file.name}")
        png = file.with_name(file.stem + "@2x.png")
        require(png.exists(), f"Missing PNG: {png.name}")
        if png.exists():
            data = png.read_bytes()[:24]
            require(data[:8] == b"\x89PNG\r\n\x1a\n", f"Invalid PNG: {png.name}")
            width, height = struct.unpack(">II", data[16:24])
            require((width, height) == (int(root.attrib["width"]) * 2, int(root.attrib["height"]) * 2),
                    f"PNG dimensions do not match source at 2x: {png.name}")


def check_example() -> None:
    net_minutes = Decimal(6) - Decimal(4)
    routine_tickets = Decimal(24000) * Decimal("0.60")
    hours = routine_tickets * net_minutes / Decimal(60)
    capacity_value = hours * Decimal(50)
    recurring_net = capacity_value - Decimal(18000)
    first_year_net = recurring_net - Decimal(12000)
    require((net_minutes, routine_tickets, hours, capacity_value, recurring_net, first_year_net) ==
            tuple(map(Decimal, (2, 14400, 480, 24000, 6000, -6000))), "Illustrative arithmetic mismatch")
    for cost, minutes in ((18000, "1.5"), (30000, "2.5")):
        threshold = Decimal(cost) / (routine_tickets / Decimal(60) * Decimal(50))
        require(threshold == Decimal(minutes), "Break-even calculation mismatch")
    print("Illustrative case: 480 hours; EUR 24,000 capacity value; EUR -6,000 first year.")


def main() -> int:
    check_documents()
    check_figures()
    check_example()
    if ERRORS:
        print("\n".join(f"FAIL: {error}" for error in ERRORS))
        return 1
    print("PASS: skill packaging, local links, SVG/PNG assets and illustrative arithmetic.")
    print("This is an integrity check, not a test of decision quality or human understanding.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
