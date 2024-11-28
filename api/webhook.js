module.exports = async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body;

        // Разделение имени и фамилии
        const firstName = body.Input?.split(' ')[0] || '';
        const lastName = body.Input?.split(' ')[1] || '';
        
        if (!body.Input) {
            return res.status(200).json({ message: 'No data received' });
        }
        
        const headers = {
            'Content-Type': 'application/json',
            'Token': '10524rjbW0MY9xAYrhBkx1wIrMzxe43nb0ZLRzeu48IKTxx9KRG8h8fZ0St3Lxzu', // Замените 'token' на ваш реальный токен
            'Cabinet-Hash': '99a805bc0d0845bf489b9b09ad69ea30' // Замените 'hash' на ваш реальный хэш
        };

        const data = {
            first_name: firstName,
            last_name: lastName,
            email: body.Email,
            phone: body.Phone,
            send_activation_email: false,
            additional_fields: body.Input_3 ? [
                {
                    field_id: 687,
                    value: body.Input_3
                }
            ] : []
        };
        console.log(data);
        try {
            const response = await fetch('https://api.kwiga.com/contacts', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error('API Error:', errorDetails);
                return res.status(response.status).json({ message: 'Failed to process data', details: errorDetails });
            }

            const result = await response.json();
            console.log(result);

            return res.status(200).json({ message: 'Data received and processed', result });
        } catch (error) {
            console.error('Fetch Error:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
};
