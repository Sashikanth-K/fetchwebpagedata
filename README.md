# fetchwebpagedata


## Installation and testing
```
git clone https://github.com/Sashikanth-K/fetchwebpagedata.git
cd fetchwebpagedata
npm install
npm test
```

## assumptions
- when we hit the URL it returns a document that has strings of data
- used JSDOM to parse the content, the library does not worry of invalid html and instead considers that invalid html as plain text 
- I assume the function will be used as a library, so it kind of throws error in given situations.
