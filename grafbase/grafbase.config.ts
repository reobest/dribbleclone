
import { graph, config } from '@grafbase/sdk'

const g = graph.Standalone()

// Define the User type
const User = g.type('User', {
  name: g.string().length({min: 3 , max : 100}),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min: 2, max: 1000 }).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(), 
  // projects: g.list(relation('Project')).optional(), 
})

// Define the Project type
const Project = g.type('Project', {
  title: g.string().length({ min: 3 }),
  description: g.string(), 
  image: g.url(),
  liveSiteUrl: g.url(), 
  githubUrl: g.url(), 
  category: g.string(),
  // createdBy: g.relation('User'), // Use type name as a string for relation
})

// Export the configuration
export default config({
  schema: g,
  auth: {
    rules: (rules) => {
      rules.public()
    },
  },
})
