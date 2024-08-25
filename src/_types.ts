export type Environment = 'local' | 'staging' | 'production';

export type PylonConfig = {
  environment?: Environment;
  baseUrl?: string;
};
