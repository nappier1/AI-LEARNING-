import { createClient } from '@supabase/supabase-js'

// Supabase setup
const supabaseUrl = 'https://prcdzxxdhdmjldmpvulx.supabase.co'
const supabaseKey = 'sb_publishable_GfuD7WT6lVydOUoWYLZVmA_V20s_l4ithi'
const supabase = createClient(supabaseUrl, supabaseKey)

// DOM Elements
const lessonsList = document.getElementById('lessons-list')
const notesList = document.getElementById('notes-list')
const newNoteInput = document.getElementById('new-note-input')
const addNoteBtn = document.getElementById('add-note-btn')

const chatBox = document.getElementById('chat-box')
const aiInput = document.getElementById('ai-input')
const aiSendBtn = document.getElementById('ai-send-btn')

// Fetch Lessons
async function fetchLessons() {
  const { data, error } = await supabase.from('lessons').select('*').order('id', { ascending: true })
  if (error) return console.error('Error fetching lessons:', error)

  lessonsList.innerHTML = ''
  data.forEach(lesson => {
    const li = document.createElement('li')
    li.textContent = lesson.title + ': ' + lesson.content
    lessonsList.appendChild(li)
  })
}

// Add Note
async function addNote() {
  const note = newNoteInput.value.trim()
  if (!note) return

  // For now, just display locally
  const li = document.createElement('li')
  li.textContent = note
  notesList.appendChild(li)
  newNoteInput.value = ''

  // Optional: save to Supabase later
  /*
  await supabase.from('notes').insert([{ note }])
  */
}

// Simple AI Simulation
function sendAI() {
  const question = aiInput.value.trim()
  if (!question) return

  const userMsg = document.createElement('div')
  userMsg.textContent = question
  userMsg.classList.add('message', 'user')
  chatBox.appendChild(userMsg)

  // Simulate AI response
  const aiMsg = document.createElement('div')
  aiMsg.textContent = 'AI Response: ' + question.split('').reverse().join('')
  aiMsg.classList.add('message', 'ai')
  chatBox.appendChild(aiMsg)

  aiInput.value = ''
  chatBox.scrollTop = chatBox.scrollHeight
}

// Event Listeners
addNoteBtn.addEventListener('click', addNote)
aiSendBtn.addEventListener('click', sendAI)

// Initial load
fetchLessons()
