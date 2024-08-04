


const scriptsInEvents = {

	async ["Title-E_Event1_Act3"](runtime, localVars)
	{
var url = window.location.href;

// Create a URL object from the string
var urlObj = new URL(url);

// Extract the userId using searchParams
var userId = urlObj.searchParams.get('userId');
var gameId = urlObj.searchParams.get('gameId');

if (gameId && gameId.endsWith('?')) {
  gameId = gameId.slice(0, -1);
}
// Set the global variable in Construct 3
runtime.globalVars.userId = userId;
runtime.globalVars.gameId = gameId;

// Log the userId for verification
console.log(`User ID: ${userId}`);
console.log(`Game ID: ${gameId}`);
	},

	async ["Title-E_Event4_Act2"](runtime, localVars)
	{
		const apiResponse = runtime.objects.Leaderboard_Id.getFirstInstance().text;
		// Parse the JSON string into a JavaScript object
		const responseObject = JSON.parse(apiResponse);
		
		// Extract the data array
		const data = responseObject.data;
		
		//User Id will be set after the user has got user id from server
		runtime.globalVars.PlayerImageURL = data.image
		runtime.globalVars.PlayerName = data.name 
		
		if(data.score == Number.isNaN())
		{
		  runtime.globalVars.PlayerScore = 0;
		}
		else
		{
		 runtime.globalVars.PlayerScore = data.score;
		 runtime.globalVars.PlayerBestScore = data.score;
		}
	},

	async ["Title-E_Event9_Act1"](runtime, localVars)
	{
// Create and populate the results array


// Assuming you have data from the API response to populate the array
const apiResponse = runtime.objects.DebugSetText.getFirstInstance().text;


// Parse the JSON string into a JavaScript object
const responseObject = JSON.parse(apiResponse);

// Extract the data array
const data = responseObject.data;
runtime.globalVars.LeaderboardDataLength = data.length;

const arraySize = data.length; // Example size
const results = new Array(arraySize).fill().map(() => ({
  level: null,
  name: null,
  score: null,
  image: null
}));

// Populate the results array with data from the API response
for (let i = 0; i < data.length; i++) {
  results[i] = {
    level: data[i].level,
    name: data[i].name,
    score: data[i].score,
    image: data[i].image
  };
}

// Format the results into a string, including image URLs
let resultsText = "Leaderboard:\n";
for (let i = 0; i < results.length; i++) {
  resultsText += `Image: ${results[i].image || 'No image'}, Level: ${results[i].level}, Name: ${results[i].name}, Score: ${results[i].score}\n`;
}

for(let i = 0; i < results.length; i++)
{
   if(i < 10)
   {
    const UserImageURL = `UserImageURL${i+1}`
    const PlayerName = `PlayerName${i+1}`
	const PlayerLevel = `PlayerLevel${i+1}`
    const PlayerScore = `PlayerScore${i+1}`;
  
    // Get the value of the global variable
	 runtime.globalVars[UserImageURL] = results[i].image;
	 runtime.globalVars[PlayerName] = results[i].name;
	 runtime.globalVars[PlayerLevel] = Math.floor(results[i].score/100);
	 runtime.globalVars[PlayerScore] = results[i].score;
   }
  
}

for(let i = 0; i < 10; i++)
{
   const UserImageURL = `UserImageURL${i+1}`
   const PlayerName = `PlayerName${i+1}`
   const PlayerLevel = `PlayerLevel${i+1}`
   const PlayerScore = `PlayerScore${i+1}`;
  
  if(i>results.length)
  {
	runtime.globalVars[UserImageURL] = "";
	runtime.globalVars[PlayerName]  = "";
	runtime.globalVars[PlayerLevel]  = "";
	runtime.globalVars[PlayerScore] = "";	 
  }
}

for(let i = 0; i < data.length; i++)
{
   if(runtime.globalVars.PlayerName == data[i].name)
   {
      runtime.globalVars.PlayerRanking = data[i].index;
   }
}

runtime.globalVars.GameBestScore = data[0].score;
// Get the Construct 3 text object and update its content
/*const leaderboardTextObject = runtime.objects.SampleText.getFirstInstance();
leaderboardTextObject.text = resultsText;*/
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

