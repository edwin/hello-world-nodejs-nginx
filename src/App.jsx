import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // State for tasks, categories, and form inputs
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [newTaskCategory, setNewTaskCategory] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editingTaskTitle, setEditingTaskTitle] = useState('')
  const [editingTaskDescription, setEditingTaskDescription] = useState('')
  const [editingTaskDueDate, setEditingTaskDueDate] = useState('')
  const [editingTaskCategory, setEditingTaskCategory] = useState('')
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [expandedTaskId, setExpandedTaskId] = useState(null)

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    const savedCategories = localStorage.getItem('categories')

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories))
    } else {
      // Initialize with a default category
      const defaultCategories = [
        { id: 'default', name: 'General' }
      ]
      setCategories(defaultCategories)
      localStorage.setItem('categories', JSON.stringify(defaultCategories))
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories])

  // Add a new task
  const addTask = (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDescription,
      dueDate: newTaskDueDate,
      category: newTaskCategory || 'default',
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTasks([...tasks, newTask])

    // Reset form
    setNewTaskTitle('')
    setNewTaskDescription('')
    setNewTaskDueDate('')
    setNewTaskCategory('')
    setShowTaskForm(false)
  }

  // Add a new category
  const addCategory = (e) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    const newCategory = {
      id: Date.now().toString(),
      name: newCategoryName
    }

    setCategories([...categories, newCategory])
    setNewCategoryName('')
    setShowCategoryForm(false)
  }

  // Delete a category
  const deleteCategory = (categoryId) => {
    // Move tasks from this category to default
    setTasks(
      tasks.map(task => 
        task.category === categoryId ? { ...task, category: 'default' } : task
      )
    )

    // Remove the category
    setCategories(categories.filter(category => category.id !== categoryId))
  }

  // Toggle task completion status
  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Start editing a task
  const startEditing = (task) => {
    setEditingTaskId(task.id)
    setEditingTaskTitle(task.title)
    setEditingTaskDescription(task.description || '')
    setEditingTaskDueDate(task.dueDate || '')
    setEditingTaskCategory(task.category || 'default')
  }

  // Save edited task
  const saveEdit = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { 
          ...task, 
          title: editingTaskTitle,
          description: editingTaskDescription,
          dueDate: editingTaskDueDate,
          category: editingTaskCategory
        } : task
      )
    )

    // Reset editing state
    setEditingTaskId(null)
    setEditingTaskTitle('')
    setEditingTaskDescription('')
    setEditingTaskDueDate('')
    setEditingTaskCategory('')
  }

  // Cancel editing
  const cancelEdit = () => {
    setEditingTaskId(null)
    setEditingTaskTitle('')
    setEditingTaskDescription('')
    setEditingTaskDueDate('')
    setEditingTaskCategory('')
  }

  // Toggle task details expansion
  const toggleTaskExpansion = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id)
  }

  // Get category name by id
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : 'Uncategorized'
  }

  // Group tasks by category
  const tasksByCategory = categories.reduce((acc, category) => {
    acc[category.id] = tasks.filter(task => task.category === category.id)
    return acc
  }, {})

  return (
    <div className="task-manager">
      <h1>Notion-like Task Manager</h1>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button 
          onClick={() => setShowTaskForm(!showTaskForm)} 
          className="primary-button"
        >
          {showTaskForm ? 'Cancel' : '+ New Task'}
        </button>
        <button 
          onClick={() => setShowCategoryForm(!showCategoryForm)} 
          className="secondary-button"
        >
          {showCategoryForm ? 'Cancel' : '+ New Category'}
        </button>
      </div>

      {/* Add Task Form */}
      {showTaskForm && (
        <form onSubmit={addTask} className="form-container">
          <h3>Create New Task</h3>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task title"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Task description"
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="form-select"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-button">Create Task</button>
        </form>
      )}

      {/* Add Category Form */}
      {showCategoryForm && (
        <form onSubmit={addCategory} className="form-container">
          <h3>Create New Category</h3>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="submit-button">Create Category</button>
        </form>
      )}

      {/* Categories and Tasks */}
      <div className="categories-container">
        {categories.map(category => (
          <div key={category.id} className="category-section">
            <div className="category-header">
              <h2>{category.name}</h2>
              {category.id !== 'default' && (
                <button 
                  onClick={() => deleteCategory(category.id)} 
                  className="delete-button small"
                  title="Delete category"
                >
                  ×
                </button>
              )}
            </div>

            <div className="task-list">
              {tasksByCategory[category.id]?.length ? (
                tasksByCategory[category.id].map(task => (
                  <div 
                    key={task.id} 
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                  >
                    {editingTaskId === task.id ? (
                      // Edit mode
                      <div className="edit-mode">
                        <div className="form-group">
                          <label>Title</label>
                          <input
                            type="text"
                            value={editingTaskTitle}
                            onChange={(e) => setEditingTaskTitle(e.target.value)}
                            className="form-input"
                            autoFocus
                          />
                        </div>

                        <div className="form-group">
                          <label>Description</label>
                          <textarea
                            value={editingTaskDescription}
                            onChange={(e) => setEditingTaskDescription(e.target.value)}
                            className="form-textarea"
                          />
                        </div>

                        <div className="form-group">
                          <label>Due Date</label>
                          <input
                            type="date"
                            value={editingTaskDueDate}
                            onChange={(e) => setEditingTaskDueDate(e.target.value)}
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <label>Category</label>
                          <select
                            value={editingTaskCategory}
                            onChange={(e) => setEditingTaskCategory(e.target.value)}
                            className="form-select"
                          >
                            {categories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="edit-actions">
                          <button onClick={() => saveEdit(task.id)} className="save-button">Save</button>
                          <button onClick={cancelEdit} className="cancel-button">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      // View mode
                      <>
                        <div className="task-header">
                          <div className="task-content">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleComplete(task.id)}
                              className="task-checkbox"
                            />
                            <span 
                              className="task-title"
                              onClick={() => toggleTaskExpansion(task.id)}
                            >
                              {task.title}
                            </span>
                          </div>
                          <div className="task-actions">
                            <button onClick={() => startEditing(task)} className="edit-button">Edit</button>
                            <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
                          </div>
                        </div>

                        {expandedTaskId === task.id && (
                          <div className="task-details">
                            {task.description && (
                              <div className="task-description">
                                <strong>Description:</strong>
                                <p>{task.description}</p>
                              </div>
                            )}

                            {task.dueDate && (
                              <div className="task-due-date">
                                <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString('en-GB')}
                              </div>
                            )}

                            <div className="task-meta">
                              <span>Created:  {new Date(task.createdAt).toLocaleDateString('en-GB')}</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-tasks">No tasks in this category. Add one above!</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
