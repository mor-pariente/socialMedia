const express = require('express');
const { OAuth2Client } = require('google-auth-library');

const app = express();
app.use(express.json()); // מוסיף תמיכה בהגעת JSON בבקשות
app.use(express.static('public'));

//app.get('/', (req, res) => {
  //  res.send('Hello, World!');
 // });
  
// איפוס אובייקט OAuth2Client עם הגדרות האפליקציה שלך
const client = new OAuth2Client({
  clientId: '288454897898-a2dej48iutcm4pn4heg9jr1grjeearok.apps.googleusercontent.com', // יש להשיב את זה לערך המתאים
});

// נתיב לקבלת הטוקן ואימותו
app.post('/verifyGoogleToken', async (req, res) => {
  const { token } = req.body; // הטוקן מתקבל מהבקשה

  try {
    // ביצוע אימות הטוקן
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '288454897898-a2dej48iutcm4pn4heg9jr1grjeearok.apps.googleusercontent.com', // יש להשיב את זה לערך המתאים
    });

    const payload = ticket.getPayload();

    // כאן תוכל לבצע פעולות נוספות כמו עדכון מצב התחברות למשתמש
    // או להציג מידע מגוגל על המשתמש כמו השם והדואר האלקטרוני
    console.log('User ID:', payload.sub);
    console.log('Email:', payload.email);
    console.log('Name:', payload.name);

    // כאן תוכל להחזיר מענה בצורת JSON או אחרת לצד הלקוח
    res.json({ success: true, message: 'Token verified successfully' });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(400).json({ success: false, message: 'Failed to verify token' });
  }
});

// השרת מאזין ליפתח 3000
const PORT = process.env.PORT || 81;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
