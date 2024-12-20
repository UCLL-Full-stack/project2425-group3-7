const HomePage = () => {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-3 text-center">Welcome to Filmpie!</h1>
        <h2 className="text-2xl font-semibold mb-3 text-center">Your Personal Movie Companion</h2>
        
        <div className="flex justify-center mb-6">
          <img 
            src="https://t3.ftcdn.net/jpg/06/52/50/84/360_F_652508416_PMVJMXZMgnpHmlUIoEnV6xlSTojSwiQ3.jpg"
            alt="Filmpie banner" 
            className="rounded-lg shadow-lg"
          />
        </div>
  
        <p className="text-lg mb-5 text-center">
          Filmpie is the ultimate app for movie lovers. Whether you're building your next movie marathon, keeping track of
          must-watch classics, or sharing your thoughts on the latest blockbusters, Filmpie has you covered.
        </p>
  
        <h3 className="text-xl font-semibold mb-3 text-center">Features</h3>
        <ul className="list-none p-0 max-w-2xl mx-auto">
          <li className="mb-2 text-center"><strong>Create Your Watchlist:</strong> Add films to your personalized watchlist so you never forget what to watch next.</li>
          <li className="mb-2 text-center"><strong>Write and Share Reviews:</strong> Share your thoughts and insights with the Filmpie community.</li>
          <li className="mb-2 text-center"><strong>Discover New Films:</strong> Admin-curated additions keep the library fresh and exciting.</li>
        </ul>
  
        <p className="text-lg mt-5 text-center">Start your cinematic journey with Filmpie today!</p>
      </div>
    );
  };
  
  export default HomePage;