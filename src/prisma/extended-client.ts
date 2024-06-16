import { PrismaClient } from '@prisma/client';
import { existsExtension } from './extensions/exists.extension';
import cuid2Extension from 'prisma-extension-cuid2';

function extendClient(base: PrismaClient) {
  // Add as many as you'd like - no ugly types required!
  return base.$extends(existsExtension).$extends(
    cuid2Extension({
      fields: [
        'Project:id',
        'ProjectFile:id',
      ],
    })
  );
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    return extendClient(this) as this;
  }
}

const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0]
) => ReturnType<typeof extendClient>;

export { ExtendedPrismaClient };
