export type Environment = 'staging' | 'production';

export type PylonConfig = {
  environment?: Environment;
  baseUrl?: string;
};
