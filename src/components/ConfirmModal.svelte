<script lang="ts">
  export let isVisible: boolean;
  export let onProceed: () => void;
  export let onCancel: () => void;
</script>

{#if isVisible}
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-white p-6 rounded shadow-md">
      <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p class="mb-4">Are you sure you want to delete this account? This action cannot be undone and will delete all related expenses.</p>
      <div class="flex justify-end">
        <button on:click={onCancel} class="mr-2 rounded bg-gray-500 px-4 py-2 text-white">Cancel</button>
        <button on:click={onProceed} class="rounded bg-red-500 px-4 py-2 text-white">Delete</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .fixed {
    position: fixed;
  }
  .inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .flex {
    display: flex;
  }
  .items-center {
    align-items: center;
  }
  .justify-center {
    justify-content: center;
  }
  .bg-gray-800 {
    background-color: #2d3748;
  }
  .bg-opacity-75 {
    background-opacity: 0.75;
  }
  .bg-white {
    background-color: #ffffff;
  }
  .p-6 {
    padding: 1.5rem;
  }
  .rounded {
    border-radius: 0.375rem;
  }
  .shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .text-xl {
    font-size: 1.25rem;
  }
  .font-bold {
    font-weight: 700;
  }
  .mb-4 {
    margin-bottom: 1rem;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .mr-2 {
    margin-right: 0.5rem;
  }
  .bg-gray-500 {
    background-color: #6b7280;
  }
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .text-white {
    color: #ffffff;
  }
  .bg-red-500 {
    background-color: #ef4444;
  }
</style>
