export const PERMISSIONS = {
  ADMIN: [
    // Workspace
    "WORKSPACE_CREATE",
    "WORKSPACE_EDIT",
    "WORKSPACE_DELETE",
    "MEMBER_MANAGE",
    // Project
    "PROJECT_CREATE",
    "PROJECT_EDIT",
    "PROJECT_DELETE",
    // Board
    "BOARD_CREATE",
    "BOARD_EDIT",
    "BOARD_DELETE",
    // Task
    "TASK_CREATE",
    "TASK_EDIT",
    "TASK_DELETE",
    // File
    "FILE_UPLOAD",
    "FILE_DELETE",
    // Document
    "DOCUMENT_CREATE",
    "DOCUMENT_EDIT",
    "DOCUMENT_DELETE",
    // Comment
    "COMMENT_ADD",
    "COMMENT_EDIT",
    "COMMENT_DELETE",
    // Chat
    "CHAT_ACCESS"
  ],
  MANAGER: [
    // Project
    "PROJECT_CREATE",
    "PROJECT_EDIT",
    // Board
    "BOARD_CREATE",
    "BOARD_EDIT",
    // Task
    "TASK_CREATE",
    "TASK_EDIT",
    // File
    "FILE_UPLOAD",
    // Document
    "DOCUMENT_CREATE",
    "DOCUMENT_EDIT",
    // Comment
    "COMMENT_ADD",
    "COMMENT_EDIT",
    // Chat
    "CHAT_ACCESS"
  ],
  MEMBER: [
    // Task
    "TASK_CREATE",
    "TASK_EDIT_OWN",
    // Document
    "DOCUMENT_CREATE_OWN",
    // Comment
    "COMMENT_ADD",
    "COMMENT_EDIT_OWN",
    // Chat
    "CHAT_ACCESS"
  ]
};
