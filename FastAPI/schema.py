from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    noticeNo: str

class ChatResponse(BaseModel):
    message: str

class SummaryRequest(BaseModel):
    noticeNo: str

class SummaryResponse(BaseModel):
    summary: str
