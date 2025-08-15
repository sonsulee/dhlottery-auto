# Commit Message Rules

## Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Rules
1. **Language**: All commit messages must be written in English
2. **Case**: Use lowercase for type and description
3. **Tense**: Use imperative mood ("add" not "added" or "adds")
4. **Length**: Keep the description under 50 characters
5. **No period**: Don't end the description with a period

## Examples

### Good Examples
```
feat: add login automation functionality
fix: resolve password field selector issue
docs: update README with environment setup
refactor: simplify browser context creation
test: add unit tests for user authentication
chore: update dependencies to latest versions
```

### Bad Examples
```
Add login feature (missing type)
feat: Added login feature. (wrong tense, has period)
FEAT: add login feature (wrong case)
feat: add comprehensive login automation functionality with error handling (too long)
```

## Scope (Optional)
Scope should indicate the area of the codebase:
```
feat(auth): add login functionality
fix(scraper): resolve element selector timeout
docs(readme): add installation instructions
```

## Body (Optional)
Use the body to explain what and why vs. how:
```
feat: add retry mechanism for failed requests

The scraper now automatically retries failed requests up to 3 times
with exponential backoff to handle temporary network issues.
```

## Footer (Optional)
Reference issues or breaking changes:
```
fix: resolve login form submission

Fixes #123

BREAKING CHANGE: environment variable DHLOTTERY_USER renamed to DHLOTTERY_ID
```