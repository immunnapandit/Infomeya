/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_CONTACT_API_URL?: string;
  readonly VITE_MCT_ENROLLMENT_API_URL?: string;
  readonly VITE_CAREER_API_URL?: string;
  readonly VITE_CAREER_OPENINGS_API_URL?: string;
  readonly VITE_ADMIN_CAREER_OPENINGS_API_URL?: string;
  readonly VITE_NEWSLETTER_API_URL?: string;
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
