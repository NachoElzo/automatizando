// Simulate a GET request
export function mockGetUser() {
  return new Promise<{ id: number; name: string }>((resolve) =>
    setTimeout(() => resolve({ id: 1, name: "Jane Doe" }), 800)
  );
}

// Simulate a POST request
export function mockCreateUser(name: string) {
  return new Promise<{ id: number; name: string }>((resolve) =>
    setTimeout(
      () => resolve({ id: Math.floor(Math.random() * 1000), name }),
      800
    )
  );
}

// Simulate a PUT request
export function mockUpdateUser(id: number, name: string) {
  return new Promise<{ id: number; name: string }>((resolve) =>
    setTimeout(() => resolve({ id, name }), 800)
  );
}

// Simulate a PATCH request
export function mockPatchUser(id: number, name: string) {
  return new Promise<{ id: number; name: string }>((resolve) =>
    setTimeout(() => resolve({ id, name }), 800)
  );
}

// Simulate a DELETE request
export function mockDeleteUser(id: number) {
  return new Promise<{ success: boolean; id: number }>((resolve) =>
    setTimeout(() => resolve({ success: true, id }), 800)
  );
}
