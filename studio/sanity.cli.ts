import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'yfd7xjeg',
    dataset: 'production'
  },
  deployment: {
    appId: 'y37xxnbv8at5ph1jew0hci7f',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
