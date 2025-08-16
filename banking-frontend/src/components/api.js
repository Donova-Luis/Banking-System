// Example API utility functions for your frontend

export async function fetchUserData(userId) {
  // Replace with your actual API endpoint
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user data');
  return response.json();
}

export async function fetchTransactions(userId) {
  const response = await fetch(`/api/users/${userId}/transactions`);
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
}

export async function updateUserProfile(userId, profileData) {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
}

// Add more