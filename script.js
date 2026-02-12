import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://prcdzxxdhdmjldmpvulx.supabase.co'
const supabaseKey = 'sb_publishable_GfuD7WT6lVydOUoWYLZVmA_V20s_l4ithi' // anon/public key
const supabase = createClient(supabaseUrl, supabaseKey)
