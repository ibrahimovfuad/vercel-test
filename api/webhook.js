function encodeFormData(data) {
    return Object.keys(data)
        .map(key => {
            const value = data[key];
            if (Array.isArray(value)) {
                return value
                    .map(item => `${encodeURIComponent(key)}[]=${encodeURIComponent(item)}`)
                    .join('&');
            } else if (typeof value === 'object' && value !== null) {
                return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
            } else {
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            }
        })
        .join('&');
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body;

        // Разделение имени и фамилии
        const firstName = body.Input?.split(' ')[0] || '';
        const lastName = body.Input?.split(' ')[1] || '';

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Token': '10524rjbW0MY9xAYrhBkx1wIrMzxe43nb0ZLRzeu48IKTxx9KRG8h8fZ0St3Lxzu',
            'Cabinet-Hash': '99a805bc0d0845bf489b9b09ad69ea30'
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

        try {
            const response = await fetch('https://api.kwiga.com/contacts', {
                method: 'POST',
                headers: headers,
                body: encodeFormData(data)
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error('API Error:', errorDetails);
                return res.status(response.status).json({ message: 'Failed to process data', details: errorDetails });
            }

            const result = await response.json();
            console.log(result);

            return res.status(200).json({ message: 'Data received and processed' });
        } catch (error) {
            console.error('Fetch Error:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
