const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('password-confirm');
const weakBar = document.getElementById('weak-bar');
const mediumBar = document.getElementById('medium-bar');
const strongBar = document.getElementById('strong-bar');
const messageElement = document.getElementById('message');

passwordInput.addEventListener('input', function() {
  const password = this.value;
  const strength = calculateStrength(password);
  updateBars(strength);
});

function calculateStrength(password) {
  let strength = 0;

  // Check length
  if (password.length >= 8) {
    strength += 1;
  }

  // Check complexity
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  }
  if (password.match(/[0-9]/)) {
    strength += 1;
  }
  if (password.match(/[$&+,:;=?@#|'<>.^*()%!-]/)) {
    strength += 1;
  }

  return strength;
}

function updateBars(strength) {
  weakBar.style.width = '0%';
  mediumBar.style.width = '0%';
  strongBar.style.width = '0%';

  if (strength === 1) {
    weakBar.style.width = '33%';
  } else if (strength === 2) {
    mediumBar.style.width = '66%';
  } else if (strength >= 3) {
    strongBar.style.width = '100%';
  }
}

function checkPassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password === confirmPassword) {
    const strength = calculateStrength(password);
    messageElement.textContent = `Password strength: ${getStrengthLabel(strength)}`;
    messageElement.style.color = getColor(strength);
  } else {
    messageElement.textContent = 'Passwords do not match. Please try again.';
    messageElement.style.color = 'black';
  }
}

function getStrengthLabel(strength) {
  if (strength === 1) {
    return 'Weak';
  } else if (strength === 2) {
    return 'Medium';
  } else if (strength >= 3) {
    return 'Strong';
  }
}

function getColor(strength) {
  if (strength === 1) {
    return '#ff6347'; // Tomato
  } else if (strength === 2) {
    return '#ffd700'; // Gold
  } else if (strength >= 3) {
    return '#32cd32'; // LimeGreen
  }
}
