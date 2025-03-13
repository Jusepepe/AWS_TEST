import socketio

# Create a Socket.IO client
sio = socketio.Client()

# Define event handlers
@sio.event
def connect():
    print("Connected to the server")

@sio.event
def connect_error(data):
    print("Connection failed:", data)

@sio.event
def disconnect():
    print("Disconnected from the server")

@sio.on("message")  # Listening for "message" events
def on_message(data):
    print(f"Server: {data}")

def send_image(image_path):
    with open(image_path, "rb") as image_file:
        # Read image as binary and encode to base64
        # image_data = base64.b64encode(image_file.read()).decode("utf-8")
        image_data = image_file.read()
    
    # Emit image data to the server
    sio.emit("image", {"filename": image_path, "data": image_data})
    print("Image sent!")

def main():
    server_url = "http://localhost:3000"  # Change to your server URL
    sio.connect(server_url)

    try:
        while True:
            image_path = input("Enter image path (or 'exit' to quit): ")
            if image_path.lower() == "exit":
                break
            send_image(image_path)

    except KeyboardInterrupt:
        pass
    finally:
        sio.disconnect()
        print("Connection closed")

if __name__ == "__main__":
    main()