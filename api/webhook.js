export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        console.log('Received data:', data);

        // Пример отправки данных в CRM (замените на вашу логику):
        // await fetch('https://your-crm-api.com/save', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data),
        // });

        return res.status(200).json({ message: 'Data received and processed' });
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
