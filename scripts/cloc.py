import os
import json
import re
import subprocess
from dataclasses import dataclass, asdict
from typing import List

@dataclass
class Report:
    language: str
    files: int
    blank: int
    comments: int
    code: int
    lines: int

@dataclass
class ModuleReport:
    name: str
    report: List[Report]

def find_module_paths(project_path: str) -> List[str]:
    module_paths = []
    for root, dirs, files in os.walk(project_path):
        if 'build.gradle' in files or 'build.gradle.kts' in files:
            if 'src' in dirs:
                module_paths.append(os.path.relpath(root, project_path))
        dirs[:] = [d for d in dirs if d != 'src']
    return module_paths

def module_to_path(module: str) -> str:
    return module.replace(':', '/') + '/'

def run_cloc(module_path: str, exclude_dir: str, extensions: str) -> dict:
    command = ['cloc', module_path, '--exclude-dir=' + exclude_dir, '--include-lang=' + extensions, '--json']

    result = subprocess.run(
        command,
        capture_output=True, text=True
    )
    return json.loads(result.stdout)

def process_cloc_report(cloc_report: dict) -> List[Report]:
    reports = []
    for language, data in cloc_report.items():
        if language not in ["header", "SUM"]:
            reports.append(Report(
                language=language,
                files=data["nFiles"],
                blank=data["blank"],
                comments=data["comment"],
                code=data["code"],
                lines=data["blank"]+data["comment"]+data["code"]
            ))
    return reports

def generate_reports(project_path: str, language: str, exclude_dir: str):
    modules = find_module_paths(project_path)
    module_reports = []

    for module in modules:
        module_path = module_to_path(module)
        full_module_path = os.path.join(project_path, module_path, 'src/')
        
        if os.path.exists(full_module_path):
            cloc_report = run_cloc(full_module_path, exclude_dir, language)
            report = process_cloc_report(cloc_report)
            replaced_module = module.replace('/', ':')
            module_reports.append(ModuleReport(name=f':{replaced_module}', report=report))
    
    print(json.dumps([asdict(report) for report in module_reports], separators=(',', ':')))

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate code line statistics for a Gradle project.")
    parser.add_argument("project_path", help="Path to the Gradle project")
    parser.add_argument("language", help="Language extensions to include (e.g., JAVA,KOTLIN,XML)")
    parser.add_argument("exclude_dir", help="Directories to exclude from the analysis")
    
    args = parser.parse_args()
    
    generate_reports(args.project_path, args.language, args.exclude_dir)
