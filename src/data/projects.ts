export type { ProjectListItem as Project } from '../types/projectDetail'
export {
  getAllProjects,
  getProjectBySlug,
  getRelatedProjects,
  getProjectsForService,
  getProjectsByService,
  getProjectServiceOptions,
  getProjectFieldOptions,
  filterProjects,
  PROJECT_DETAILS,
} from './projectDetails'

import { getAllProjects } from './projectDetails'

/** @deprecated Use getAllProjects() instead */
export const PROJECTS = getAllProjects()
