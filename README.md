# Injectify

**Injectify** automates your API project boilerplate by injecting essential files when you create a new entity folder under `src/api`. When a new folder (e.g., `user`) is created, Injectify asks whether you want to generate a set of essential files for that entity. If you agree, it creates structured files such as `user.controller.ts`, `user.model.ts`, and more, all with the entity name as a prefix, ready for rapid development.

## Features

- Automatically injects boilerplate code for controllers, services, models, and more.
- Reduces time spent on repetitive tasks when creating new entities.
- Simple and intuitive setup that fits into your existing workflow.

## Installation

1. Install the extension from the Visual Studio Code Marketplace.

2. Once installed, the extension will automatically monitor the `src/api` folder in your workspace.

3. When you create a new folder under `src/api`, Injectify will prompt you to create the necessary files for that entity.

## Usage

1. Create a new folder under `src/api` (e.g., `user`).

2. After folder creation, you will be prompted whether to create boilerplate files for that entity.

3. If you choose **Yes**, the necessary files will be created for you:

   - `user.controller.ts`
   - `user.model.ts`
   - `user.service.ts`
   - `user.interface.ts`
   - `user.dto.ts`

4. Modify the generated files to suit your application logic.

## Command Palette

- **Injectify: Create Files**: Manually trigger the file creation for an entity folder.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This extension is licensed under the MIT License.
