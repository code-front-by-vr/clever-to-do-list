<script>
export default {
  name: 'AuthLink',
}
</script>

<template>
  <p class="auth-link">
    <slot />
  </p>
</template>

<style>
.auth-link {
  text-align: center;
  margin-top: var(--space-md);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.auth-link a {
  color: var(--color-primary);
  font-weight: var(--fw-semibold);
  text-decoration: none;
  transition: color 0.3s ease;
}

.auth-link a:hover {
  color: var(--color-secondary);
}

.auth-link a:visited {
  color: var(--color-primary);
}
</style>
