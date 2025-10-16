import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsString, validateSync } from 'class-validator';

class EnvVars {
  @IsEnum(['development', 'test', 'production'] as any) NODE_ENV!: string;
  @IsInt() PORT!: number;
  @IsString() DB_HOST!: string; @IsInt() DB_PORT!: number;
  @IsString() DB_USER!: string; @IsString() DB_PASS!: string; @IsString() DB_NAME!: string;
}

export const validate = (config: Record<string, unknown>) => {
  const v = plainToInstance(EnvVars, config, { enableImplicitConversion: true });
  const errors = validateSync(v, { skipMissingProperties: false });

  if (errors.length) throw new Error(errors.toString());

  return v;
};

