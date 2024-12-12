import os
import streamlit.components.v1 as components
import uuid


_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        "scroll_to_here_component",
        url="http://localhost:3001",  # Replace with your local dev server URL
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("scroll_to_here_component", path=build_dir)


def scroll_to_here(delay: int = 2000, key: str = None) -> None:
    """
    Scroll the parent window to the iframe location.

    Parameters
    ----------
    delay : int, optional
        Time in milliseconds before the scroll action. Defaults to 2000ms.
    key : str, optional
        A unique identifier for the component.

    Returns
    -------
    None
    """
    unique_key = str(uuid.uuid4())
    _component_func(delay=delay, key=f"key_{unique_key}")
