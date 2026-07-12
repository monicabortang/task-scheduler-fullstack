<template>
  <div class="input-group mb-4 shadow-sm rounded-pill overflow-hidden bg-white border-0">
    <span class="input-group-text bg-white border-0 ps-4"><i class="bi bi-search text-muted"></i></span>
    <input 
      type="text" 
      class="form-control border-0 py-3" 
      placeholder="Search your tasks (e.g. Math, Meeting, Groceries)..."
      @input="$emit('search', $event.target.value)"
    >
  </div>
</template>