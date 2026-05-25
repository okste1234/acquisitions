// running server, implementing logins, ... to ensure server runs properly

import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    { console.log(`Server is running on port http://localhost:${PORT}`); }
);




