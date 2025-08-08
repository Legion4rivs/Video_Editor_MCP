from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Go to the page
            page.goto("http://localhost:5173", timeout=10000)

            # Wait for the canvas element to be visible
            canvas = page.locator('canvas')
            expect(canvas).to_be_visible(timeout=5000)

            # Give the scene a moment to render if needed
            page.wait_for_timeout(1000)

            # Take a screenshot
            page.screenshot(path="jules-scratch/verification/verification.png")
            print("Screenshot taken successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
