import { createClient } from '@supabase/supabase-js'

// Supabase setup
const supabaseUrl = 'https://prcdzxxdhdmjldmpvulx.supabase.co'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'  // replace with your anon key
const supabase = createClient(supabaseUrl, supabaseKey)

// DOM elements
const todoList = document.getElementById('todo-list')
const addBtn = document.getElementById('add-btn')
const newTaskInput = document.getElementById('new-task')

// Fetch todos from Supabase
async function fetchTodos() {
  const { data, error } = await supabase.from('todos').select('*').order('id', { ascending: true })
  if (error) return console.error('Error fetching todos:', error)

  todoList.innerHTML = ''
  data.forEach(todo => {
    const li = document.createElement('li')
    li.textContent = `${todo.task} [${todo.status}]`
    todoList.appendChild(li)
  })
}

// Add new todo
async function addTodo() {
  const task = newTaskInput.value.trim()
  if (!task) return

  const { data, error } = await supabase.from('todos').insert([{ task, status: 'Started' }])
  if (error) return console.error('Error adding todo:', error)

  newTaskInput.value = ''
  fetchTodos()
}

// Event listener
addBtn.addEventListener('click', addTodo)

// Initial fetch
fetchTodos()
