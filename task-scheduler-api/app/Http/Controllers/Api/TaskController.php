<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return auth()->user()->tasks()->latest()->get();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'priority' => 'required|string',
            'due_date' => 'nullable|date' // Pastikan baris ini ada
        ]);

        $task = auth()->user()->tasks()->create($fields);
        return response()->json($task, 201);
    }

    public function destroy($id)
    {
        $task = auth()->user()->tasks()->findOrFail($id);
        $task->delete();
        return response(['message' => 'Task deleted'], 200);
    }

    public function update(Request $request, $id)
    {
        $task = auth()->user()->tasks()->findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|in:Pending,Completed,In Progress',
            'priority' => 'sometimes|required|in:Low,Medium,High',
            'due_date' => 'nullable|date',
            'is_favorite' => 'sometimes|boolean',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    public function show($id)
    {
        return auth()->user()->tasks()->findOrFail($id);
    }

}
