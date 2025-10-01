import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'yfd7xjeg',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true
  },
})
