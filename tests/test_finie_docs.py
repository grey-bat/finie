"""Smoke tests for FINie — verify required docs exist and are non-empty (archived repo)."""
import os

REPO_ROOT = os.path.dirname(os.path.dirname(__file__))
REQUIRED_DOCS = ["README.md", "PRD.md", "SPEC.md", "PLAN.md"]


def test_required_docs_exist():
    for doc in REQUIRED_DOCS:
        path = os.path.join(REPO_ROOT, doc)
        assert os.path.isfile(path), f"Missing required doc: {doc}"


def test_required_docs_non_empty():
    for doc in REQUIRED_DOCS:
        path = os.path.join(REPO_ROOT, doc)
        if os.path.isfile(path):
            assert os.path.getsize(path) > 0, f"{doc} is empty"


def test_gitignore_excludes_xlsx():
    gitignore_path = os.path.join(REPO_ROOT, ".gitignore")
    assert os.path.isfile(gitignore_path), ".gitignore is missing"
    with open(gitignore_path) as f:
        content = f.read()
    assert "*.xlsx" in content or "xlsx" in content, ".gitignore should exclude *.xlsx"
