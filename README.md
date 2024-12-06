# Injectify

**Injectify** automates your API project boilerplate by injecting essential files when you create a new entity folder under `src/api`. When a new folder (e.g., `user`) is created, Injectify asks whether you want to generate a set of essential files for that entity. If you agree, it creates structured files such as `user.controller.ts`, `user.model.ts`, and more, with the entity name as a prefix.

## Features

- Automatically generates controller, service, model, DTO, and interface files for new entities.
- Seamlessly integrates with your `src/api` folder structure.
- Configurable and easy to use.

## Installation

1. Download and install the extension from the VS Code marketplace.
2. Create a new folder under `src/api` (e.g., `user`).
3. Injectify will prompt you to generate files for the new entity.

## Usage

When a new folder is created in the `src/api` directory, you will be prompted to allow Injectify to inject boilerplate files into that folder. If you agree, the following files will be generated:

- `user.controller.ts`
- `user.model.ts`
- `user.service.ts`
- `user.interface.ts`
- `user.dto.ts`

## License

MIT
