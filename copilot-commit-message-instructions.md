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
Use the body to explain what and why vs. how, including business context:
```
feat: add retry mechanism for failed requests

The scraper now automatically retries failed requests up to 3 times
with exponential backoff to handle temporary network issues.

Business Context: Users reported frequent failures during peak hours
when lottery site experiences high traffic, causing missed purchases.
```

## Footer (Optional)
Reference issues or breaking changes:
```
fix: resolve login form submission

Fixes #123

BREAKING CHANGE: environment variable DHLOTTERY_USER renamed to DHLOTTERY_ID
```

## Business Context Guidelines

### Include Business Reasoning
Explain the business motivation behind technical changes:

**Good Examples:**
```
feat: add deposit amount validation

Business Context: Prevent users from attempting purchases when 
insufficient funds, reducing customer support tickets by 80%.

fix: update login selector for new UI

Business Context: Lottery site redesigned login page, breaking 
automation for 500+ daily users.
```

### Historical Context
Document why previous approaches were changed:

```
refactor: replace hardcoded selectors with data attributes

Historical Context: Previous CSS class-based selectors broke 
frequently during site updates (3 times in last month), causing 
service downtime and user complaints.

Decision: Switch to more stable data attributes approach.
```

### Impact Documentation
Describe the expected business impact:

```
perf: optimize scraping speed by 40%

Business Context: Faster execution means higher success rate during
peak lottery sales periods (Friday 6-8 PM), when site performance 
degrades and timing is critical for purchase completion.

Expected Impact: Increase successful purchase rate from 85% to 95%
during peak hours.
```

### Problem-Solution Mapping
Connect specific business problems to technical solutions:

```
feat: add headless mode configuration

Business Problem: Users running automation on servers without 
display capability cannot use the tool.

Solution: Allow headless browser operation via environment variable.

Business Impact: Enables deployment on cloud servers, expanding 
user base to technical users (estimated 30% market expansion).
```

## When to Include Business Context

### Always Include For:
- **User-facing features**: New automation capabilities
- **Breaking changes**: Changes affecting user workflow  
- **Performance improvements**: Speed/reliability enhancements
- **Security fixes**: Data protection or authentication changes
- **Error handling**: Reducing user friction or support load

### Optional For:
- **Code refactoring**: Internal improvements without user impact
- **Documentation**: Unless it addresses user confusion
- **Build/CI changes**: Internal development process improvements

### Project-Specific Examples (Lottery Automation)

```
feat: add automatic number selection algorithm

Business Context: Manual number selection takes 2-3 minutes per ticket,
preventing users from purchasing multiple tickets during high-traffic 
sales periods.

Technical Solution: Implement smart number selection based on historical 
patterns and user preferences.

Expected Impact: Reduce ticket purchase time by 90%, enabling bulk 
purchases during peak sales windows.

---

fix: handle site maintenance mode gracefully

Business Context: Lottery site goes into maintenance during draws 
(every Tuesday/Friday 8-9 PM), causing automation failures and user 
confusion about missed purchases.

Historical Context: Previous version would crash and require manual 
restart, affecting 100% of users during maintenance windows.

Solution: Detect maintenance page and queue purchases for retry after 
maintenance ends.

User Impact: Zero manual intervention required during maintenance periods.
```