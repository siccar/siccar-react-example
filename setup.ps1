param(
  [Parameter(Mandatory = $true)]
  [string]$token,
  [string]$siccarUri = "https://localhost:8443",
  [string]$registerId = "40daacacf4ef407cb5c4b9b7d0e7fe36"
)
$walletAddress = "ws1jfk5jwvqvpnqr2nxaxlwq76falqymmz29q4rar3x05xkjzpqqqp2qcv08xa"
$pathToBlueprint = "./src/data/blueprint.json"

Write-Output("Siccar Platform Url: ${siccarUri}")

# Write Create wallet requests 
try {
   Invoke-WebRequest $siccarUri/api/Wallets `
    -ErrorVariable $walletError1 `
    -ErrorAction SilentlyContinue `
    -Method 'POST' `
    -ContentType 'application/json; charset=utf-8' `
    -Body '{"name": "Sender", "mnemonic": "happy husband link guess know phrase tennis circle sick climb mail daring borrow observe give boss belt eight yard merit attend warfare awkward suspect"}' `
    -Headers @{'Authorization' = 'Bearer ' + $token }

    Write-Output("Sender wallet created successfully.")
}
catch [Microsoft.PowerShell.Commands.HttpResponseException] {
  if ($_.ErrorDetails -like "*400*") {
    Write-Warning -Message 'Wallet already exists.'
  }
  else {
    Write-Host $_
    Write-Error -Message 'Siccar platform returned error http response' 
  }

}
catch {
  Write-Host $_
  Write-Error -Message 'An Error occured creating the sender wallet.'
}

try {
  Invoke-WebRequest $siccarUri/api/Wallets -ErrorVariable $walletError2  -ErrorAction SilentlyContinue `
    -Method 'POST' `
    -ContentType 'application/json; charset=utf-8' `
    -Body '{"name": "Recipient", "mnemonic": "idle human educate sibling hospital stick hover make surface infant climb wool broom range review nation vivid teach item cry wagon book tube keep"}' `
    -Headers @{'Authorization' = 'Bearer ' + $token }

    Write-Output("Recipient wallet created successfully.")
}
catch [Microsoft.PowerShell.Commands.HttpResponseException] {
  if ($_.ErrorDetails -like "*400*") {
    Write-Warning -Message 'Wallet already exists.'
  }
  else {
    Write-Host $_
    Write-Error -Message 'Siccar platform returned error http response' 
  }

}
catch {
  Write-Host $_
  Write-Error -Message 'An Error occured creating the recipient wallet.'
}

# Write Publish blueprint requests

try{
  $blueprintRequest = Invoke-WebRequest $siccarUri/api/Blueprints/$walletAddress/$registerId/publish `
    -Method 'POST' `
    -ContentType 'application/json; charset=utf-8' `
    -Body @([io.file]::ReadAllText($pathToBlueprint)) `
    -Headers @{'Authorization' = 'Bearer ' + $token }
  
  $content = $blueprintRequest.Content | ConvertFrom-Json
  Write-Output("Blueprint was published with transaction id: " + $content.txId)
  Write-Output("Please paste this transaction id into the react environment variables.")
}
catch [Microsoft.PowerShell.Commands.HttpResponseException] {
  Write-Host $_
  if ($_.ErrorDetails -like "*400*") {
    Write-Warning -Message 'Invalid bluerprint.'
  }
  else {
    Write-Host $_
    Write-Error -Message 'Siccar platform returned error http response' 
  }
}
catch {
  Write-Host $_
  Write-Error -Message 'An Error occured creating the recipient wallet.'
}

