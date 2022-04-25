param(
  [Parameter(Mandatory=$true)]
  [string]$token,
  [string]$siccarUri = "https://localhost:8443"
)

$pathToBlueprint = "./src/data/blueprint.json"

Write-Output($token)
Write-Output($siccarUri)

# Write Create wallet requests 

# Write Publish blueprint requests


