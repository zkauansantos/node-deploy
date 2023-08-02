import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, NotEquals, validateSync } from 'class-validator';

class Env {
  @IsNotEmpty()
  @IsString()
  jwtSecret: string;

  @IsNotEmpty()
  @IsString()
  database: string;

  @IsString()
  @IsNotEmpty()
  feDevURL: string;

  @IsString()
  @IsNotEmpty()
  @NotEquals('unsecure_prod_url')
  feProdURL: string;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  database: process.env.DATABASE_URL,
  feDevURL: process.env.FRONT_END_DEV_URL,
  feProdURL: process.env.FRONT_END_PROD_URL,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
