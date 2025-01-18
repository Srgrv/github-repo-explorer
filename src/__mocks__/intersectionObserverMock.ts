class IntersectionObserverMock {
  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {}

  observe(_target: Element) {
    // Mock logic for observing elements
  }

  unobserve(_target: Element) {
    // Mock logic for unobserving elements
  }

  disconnect() {
    // Mock logic for disconnecting
  }
}

// @ts-ignore: Define global IntersectionObserver mock
global.IntersectionObserver = IntersectionObserverMock;
