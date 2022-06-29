# Typescript Workshops Examples

## Setup

Please make sure that your development setup can run react-native v0.68.1 and clone the repository.
Then, run the following commands

```bash
> yarn
> npx pod-install
```

This should allow you to run the example locally from your terminal by running either

```bash
> yarn ios
```

or

```bash
> yarn android
```

## Overview

This example app includes two screens - Home and SignIn. Home is available in two versions - `React.ClassComponent` and `React.FunctionalComponent`, additionally, the class is written in pure JS and the function is written in TypeScript. These two version visualize differences in size, complexity and logic separation between both implementations.

Additionally, there is a simple `SignIn` form implementation with `react-hook-form` added to demonstrate more complex generative typing conventions as well as provide a real life example of a fully typed utility function - `getValidationResults`.

To support the above-mentioned examples we implemented a full setup for typescript with multiple aliases to simplify importing. We include a clear folder structure, apiService to handle calling the public IMDB API for data, fallback on test data from JSON and some additional components to make everything feel as complete as possible for a real-life example.

## Refactoring exercise

You can test yourself by switching to the `@exercise/refactoring-a-class` branch and taking a shot at refactoring the `Home.screen.class.js` file into TS and then comparing it to the `@main` branch.
