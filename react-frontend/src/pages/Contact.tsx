const Contact = () => {
    return (
        <div className="container w-[50%] mx-auto">

            <div className="px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2">Contact our Team</h1>
                    <p className="text-gray-600">Let us know how we can help you ?</p>
                </div>

                {/* Image Section */}
                <div className="flex justify-center mb-10">
                    <img
                        src="/images/contact.png"
                        alt="Open book with magical glowing lights"
                        className="h-64 w-[400px]"
                    />
                </div>

                {/* Contact Methods Section */}
                <div className="w-[80%] min-w-max mx-auto grid grid-cols-3 gap-4 mb-16">
                    <div className="flex flex-col items-center p-4 space-y-4">
                        <svg className="w-12 h-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2">Chat to Us</h2>
                        <p className="text-gray-600 mb-2">Speak to our friendly team</p>
                        <p className="font-medium">email@u.nus.edu</p>
                    </div>

                    <div className="flex flex-col items-center p-4 space-y-4">
                        <svg className="w-12 h-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-bold mb-2">Visit Us</h2>
                            <p className="font-light whitespace-nowrap mb-6">Visit our book store</p>
                            <p className="font-mediu whitespace-nowrap">25 Heng Mui Keng Terrace</p>
                            <p className="font-medium">Singapore 119615</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center p-4 space-y-4">
                        <svg className="w-12 h-12 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2">Call Us</h2>
                        <p className="text-gray-600 mb-2">Monday - Friday: </p>
                        <p className="text-gray-600 mb-2">9:00am to 5:00pm </p>
                        <p className="font-medium">(65) 6516 2093</p>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-center mb-2">FAQ</h1>
                    <p className="text-gray-600 text-center mb-8">Frequently Asked Questions</p>

                    {/* FAQ Items */}
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2">What are the benefits of creating an account on the website?</h3>
                            <p className="text-gray-600">Creating an account allows you to track your orders, view your reading history, save your favorite books, and receive personalized recommendations.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2">Can I use the same account to log in on different devices?</h3>
                            <p className="text-gray-600">Yes, you can use the same account to log in on multiple devices, allowing you to access your book collection and preferences from anywhere.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2">Can I filter books by genre?</h3>
                            <p className="text-gray-600">Yes, you can filter books by various genres such as programming, travel, business etc., to find books that match your interests.</p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2">How can I contact customer support?</h3>
                            <p className="text-gray-600">You can contact customer support through various channels such as email, phone, support is usually available during business hours, and response times may vary.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;