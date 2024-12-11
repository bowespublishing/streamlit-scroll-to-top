# streamlit-scroll-to-top
Streamlit component which provides a hacky workaround to utilise streamlit buttons, iframes and state management to redirect users to different points on a page.

[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://scroll-to-top-demo.streamlit.app/)

<a href="https://buymeacoffee.com/bowespublishing" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" width="180"></a>

![](./img/demo.gif)

## How does it work?

The component works by creaing an invisible iframe in the location you want to scroll to and then tells the parent window to move the focus to that iframe. See the Example usage further below to get a further idea of how it works/how to implement it in your code. There are other ways to do this however I wanted a way I could easily use streamlit buttons & the session state to move the user to different locations.

This may stop working at any moment or indeed may not work on some browsers. I've tested on Edge, Chrome, Firefox & Opera and all appears to be OK

## Features

- Scroll to the top of a page (or any point) easily using existing Streamlit buttons.

## Installation

```shell script
pip install streamlit-scroll-to-top
```

## Example Usage

Copy this code snippet:

```python
import streamlit as st
from scroll_component import scroll_to_here

# Step 1: Initialize scroll state in session_state
if 'scroll_to_top' not in st.session_state:
    st.session_state.scroll_to_top = False
    
if 'scroll_to_header' not in st.session_state:
    st.session_state.scroll_to_header = False

# Step 2: Handle the scroll-to-top action
if st.session_state.scroll_to_top:
    scroll_to_here(0, key='top')  # Scroll to the top of the page
    st.session_state.scroll_to_top = False  # Reset the state after scrolling

# Step 3: Define a scroll function to trigger the state change
def scroll():
    st.session_state.scroll_to_top = True
    
def scrollheader():
    st.session_state.scroll_to_header = True

# Step 4: Add some dummy content to simulate a long page
st.title("Dummy Content")
st.write("Scroll down to see the 'Scroll to Top' button.")
for i in range(50):  # Generate dummy content
    if i == 25:
        if st.session_state.scroll_to_header:
            scroll_to_here(0, key='header')  # Scroll to the top of the page
            st.session_state.scroll_to_header = False  # Reset the state after scrolling
        st.header("Or scroll here")
    st.text(f"Line {i + 1}: This is some dummy content.")

# Step 5: Add a button to trigger the scroll to top action. Both ways work... personal preference
st.button("Scroll to Top", on_click=scroll)
if st.button("Scroll to Top 2"):
    st.session_state.scroll_to_top = True
    st.rerun()
    
# Step 5: Add a button to trigger the scroll to header action. Both ways work... personal preference    
st.button("Scroll to Header", on_click=scrollheader)
if st.button("Scroll to Header 2"):
    st.session_state.scroll_to_header = True
    st.rerun()
```
