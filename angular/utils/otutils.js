opentok = require('./opentok');

// OpenTok Related
var OPENTOK_API_KEY = '21910862',
    OPENTOK_API_SECRET = '1cb3215846721d5c5486536d577c67e9d46e8c17',
    ot = new opentok.OpenTokSDK(OPENTOK_API_KEY, OPENTOK_API_SECRET),

// NOTE: Uncomment for production, defaults to "staging.tokbox.com"
// ot.setEnvironment("api.tokbox.com"),

// Variables for managing OpenTok Sessions
    MAX_SESSION_CONNECTIONS = 2,	// Maximum number of client connections we want in a given session
    session_map = {},				// Hash for getting the session of a given client
    ot_sessions = new Array();		// Array for holding all sessions we have generated
    var session_info={ sID:"", clients:[]};




// Sends the session info back to the client for the client to join
var enterSession= function(session, client) {
    // Construct info object to pass back to client then send it
    var opentok_info = {
        sessionId: session.session,
        apiKey: OPENTOK_API_KEY,
        token: ot.generateToken()
    }
    var jsoninfo = JSON.stringify(opentok_info);
    client.send(jsoninfo);

    // Create array to hold all the clients in the session
    if (!session.clients) {
        session.clients = new Array();
   }

    // Add the client to the session
    session.clients.push(client.sessionId);
    session_map[client.sessionId] = session;	// Use map later to identify what session client was in
}

// Finds which session the client was in and removes the client from that session.
var leaveSession= function(client) {
    // Find the session that the client was in
    var session = session_map[client.sessionId];

    // Find the position of the client in the session
    var index = session.clients.indexOf(client.sessionId);

    // Remove the client from the session
    session.clients.splice(index, 1);
}

// Finds an available session for the client to connect to
var getSession = function(client) {

    var session;
    // Look through all sessions to find a session that has less than the max number of sessions
    // NOTE: We start searching from the top of the array since it is more likely a non-full session is there
    for (var i = ot_sessions.length - 1; i >= 0; i--) {
        var tmp_session = ot_sessions[i];
        if (tmp_session.clients.length < MAX_SESSION_CONNECTIONS) {
            session = tmp_session;
            break;
        }
    }

    if (!session) {
        // If we didn't find a session, generate one and enter it
        ot.createSession('localhost',{},function(session) {
            sessionInf = new Object();
            sessionInf.session = session;
            ot_sessions.push(sessionInf);
            enterSession(sessionInf,client);
        })
    } else {
        // Otherwise enter the session we found
        enterSession(session, client);
    }
}

module.exports = {
    enterSession: enterSession,
    leaveSession: leaveSession,
    getSession:getSession
}