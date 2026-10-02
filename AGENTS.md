# Architecture Rules

- Keep supplied editorial topic libraries in typed content modules and database seed records so public and admin views share one content vocabulary.
- Keep Prescribly-wide content separate from PadAndFresh donation data because PadAndFresh is one campaign within the events ecosystem.
- Protect administration with a pathless authenticated route plus server-validated role checks because route visibility alone is not a security boundary.
