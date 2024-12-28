<script lang="ts">
  export let isVisible: boolean;
  export let onProceed: () => void;
  export let onCancel: () => void;
</script>

{#if isVisible}
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded shadow-lg">
      <h2 class="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p class="mb-4">Are you sure you want to delete this account? This action cannot be undone and will delete all related expenses.</p>
      <div class="flex justify-end space-x-4">
        <button on:click={onCancel} class="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
        <button on:click={onProceed} class="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
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
  .bg-black {
    background-color: black;
  }
  .bg-opacity-50 {
    background-opacity: 0.5;
  }
  .bg-white {
    background-color: white;
  }
  .p-6 {
    padding: 1.5rem;
  }
  .rounded {
    border-radius: 0.375rem;
  }
  .shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
  .space-x-4 > :not(:last-child) {
    margin-right: 1rem;
  }
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .bg-gray-500 {
    background-color: #6b7280;
  }
  .text-white {
    color: white;
  }
  .bg-red-500 {
    background-color: #ef4444;
  }
</style>
