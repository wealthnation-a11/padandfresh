# Architecture Rules

- Keep supplied editorial topic libraries in typed content modules and database seed records so public and admin views share one content vocabulary.
- Keep Prescribly-wide content separate from PadAndFresh donation data because PadAndFresh is one campaign within the events ecosystem.
- Protect administration with a pathless authenticated route plus server-validated role checks because route visibility alone is not a security boundary.
- Keep content editing schemas and field definitions in a shared module, and validate allowlisted writes through authenticated team server functions so public content and administration stay consistent without privileged clients.
