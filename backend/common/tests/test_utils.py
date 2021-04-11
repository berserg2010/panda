import pytest

from ..utils import sorted_list_pydantic_models


def test_sorted_list_pydantic_models():
    sorted_list = sorted_list_pydantic_models([], 'test')
    assert sorted_list == []
